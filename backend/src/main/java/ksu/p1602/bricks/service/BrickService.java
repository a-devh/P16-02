package ksu.p1602.bricks.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import ksu.p1602.bricks.dto.AdminBrickDto;
import ksu.p1602.bricks.dto.PositionKeyDto;
import ksu.p1602.bricks.dto.RowCheckDto;
import ksu.p1602.bricks.model.Brick;
import ksu.p1602.bricks.repository.BrickRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BrickService {

    private static final int NAME_MAX = 255;
    private static final String POSITION_TAKEN = "A brick already exists at that position";

    private final BrickRepository brickRepository;

    // deleted: false = active only, true = deleted only, null = both
    public Page<Brick> search(String q, Brick.Campus campus, Brick.Section section, Boolean deleted, int page, int size) {
        String query = (q == null || q.isBlank()) ? null : q.trim();
        String brickCampus = (campus == null) ? null : campus.name();
        String brickSection = (section == null) ? null : section.name();

        if (query == null && brickCampus == null && brickSection == null) {
            return Page.empty();
        }

        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.max(size, 1));
        return brickRepository.searchPage(query, brickCampus, brickSection, deleted, pageable);
    }

    // deleted: false = active only (404 if deleted), null = either
    public Brick getById(Long id, Boolean deleted) {
        Optional<Brick> brick = (deleted == null)
        ? brickRepository.findById(id) : brickRepository.findByIdAndDeleted(id, deleted);
        return brick.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Brick not found"));
    }

    @Transactional
    public Brick create(AdminBrickDto request) {
        requireValid(request);

        if (brickRepository.existsByCampusAndSectionAndNumberAndDeletedFalse(
                request.campus(), request.section(), request.number())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, POSITION_TAKEN);
        }

        Brick brick = new Brick();
        apply(brick, request);
        return saveOrConflict(brick);
    }

    @Transactional
    public Brick update(AdminBrickDto request) {
        if (request == null || request.id() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "id is required");
        }
        requireValid(request);

        Brick brick = getById(request.id(), null);

        // only an active brick can collide with another active brick
        if (!request.deleted() && brickRepository.existsByCampusAndSectionAndNumberAndDeletedFalseAndIdNot(
                request.campus(), request.section(), request.number(), brick.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, POSITION_TAKEN);
        }

        apply(brick, request);
        brick.setDeleted(request.deleted());
        return saveOrConflict(brick);
    }

    // index is the row's 0-based position in the list
    public List<RowCheckDto> checkList(List<AdminBrickDto> requests) {
        if (requests == null) {
            return List.of();
        }

        List<RowCheckDto> results = new ArrayList<>();
        Set<PositionKeyDto> seen = new HashSet<>();

        for (int i = 0; i < requests.size(); i++) {
            AdminBrickDto request = requests.get(i);
            Map<String, String> errors = validate(request);

            if (errors.isEmpty()) {
                PositionKeyDto key = new PositionKeyDto(request.campus(), request.section(), request.number());
                if (!seen.add(key)) {
                    errors.put("position", "Duplicate position in this list");
                } else if (brickRepository.existsByCampusAndSectionAndNumberAndDeletedFalse(
                        key.campus(), key.section(), key.number())) {
                    errors.put("position", POSITION_TAKEN);
                }
            }

            results.add(new RowCheckDto(i, errors.isEmpty(), errors));
        }
        return results;
    }

    // all or nothing: if any row fails the check, nothing is saved
    @Transactional
    public List<Brick> importList(List<AdminBrickDto> requests) {
        if (requests == null || requests.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No bricks to import");
        }

        List<RowCheckDto> invalid = checkList(requests).stream()
            .filter(row -> !row.valid())
            .toList();
        if (!invalid.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                invalid.size() + " row(s) failed validation, first is row " + invalid.get(0).index()
                + ": " + invalid.get(0).errors());
        }

        List<Brick> bricks = requests.stream().map(request -> {
            Brick brick = new Brick();
            apply(brick, request);
            return brick;
        }).toList();

        try {
            return brickRepository.saveAllAndFlush(bricks);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, POSITION_TAKEN);
        }
    }

    // field name -> message; empty when the row is valid
    private Map<String, String> validate(AdminBrickDto request) {
        Map<String, String> errors = new LinkedHashMap<>();
        if (request == null) {
            errors.put("row", "Row is empty");
            return errors;
        }
        if (request.name() == null || request.name().isBlank()) {
            errors.put("name", "Name is required");
        } else if (request.name().trim().length() > NAME_MAX) {
            errors.put("name", "Name must be at most " + NAME_MAX + " characters");
        }
        if (request.campus() == null) {
            errors.put("campus", "Campus is required");
        }
        if (request.section() == null) {
            errors.put("section", "Section is required");
        }
        if (request.number() == null) {
            errors.put("number", "Number is required");
        } else if (request.number() < 1) {
            errors.put("number", "Number must be positive");
        }
        return errors;
    }

    private void requireValid(AdminBrickDto request) {
        Map<String, String> errors = validate(request);
        if (!errors.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errors.toString());
        }
    }

    // copies only the editable fields; id, deleted and audit fields are left alone
    private void apply(Brick brick, AdminBrickDto request) {
        brick.setName(request.name().trim());
        brick.setInscription(request.inscription() == null || request.inscription().isBlank()
            ? null : request.inscription().trim());
        brick.setCampus(request.campus());
        brick.setSection(request.section());
        brick.setNumber(request.number());
    }

    // the unique index can still reject a save if another request took the spot first
    private Brick saveOrConflict(Brick brick) {
        try {
            return brickRepository.saveAndFlush(brick);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, POSITION_TAKEN);
        }
    }
}