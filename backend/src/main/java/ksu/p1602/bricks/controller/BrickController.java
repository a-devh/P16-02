package ksu.p1602.bricks.controller;
import ksu.p1602.bricks.dto.AdminBrickDto;
import ksu.p1602.bricks.dto.BrickDto;
import ksu.p1602.bricks.dto.RowCheckDto;
import ksu.p1602.bricks.model.Brick;
import ksu.p1602.bricks.service.BrickService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BrickController {
    private final BrickService brickService;

    //public endpoints
    @GetMapping ("user/bricks/search")
    public Page<BrickDto> searchBricks(
        @RequestParam(required = false) String q,
        @RequestParam(required = false) Brick.Campus campus,
        @RequestParam(required = false) Brick.Section section,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "25") int size
    ) {
        return brickService.search(q, campus, section, false, page, Math.min(size, 50))
        .map(BrickDto::fromEntity);
    }

    @GetMapping("user/bricks/{id}")
    public BrickDto get(@PathVariable Long id) {
        return BrickDto.fromEntity(brickService.getById(id, false));
    }

    //admin endpoints
    @GetMapping("admin/bricks/search")
    
    public Page<AdminBrickDto> searchAdminBricks(
        @RequestParam(required = false) String q,
        @RequestParam(required = false) Brick.Campus campus,
        @RequestParam(required = false) Brick.Section section,
        @RequestParam(defaultValue = "false") Boolean deleted,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "25") int size
        
    ) {
        return brickService.search(q, campus, section, deleted, page, Math.min(size, 50))
        .map(AdminBrickDto::fromEntity);
    }

    @GetMapping("admin/bricks/{id}")
    public AdminBrickDto adminGet(@PathVariable Long id) {
        return AdminBrickDto.fromEntity(brickService.getById(id, null));
    }

    @PostMapping("admin/bricks/create")
    public AdminBrickDto create(@Valid @RequestBody AdminBrickDto request) {
        return AdminBrickDto.fromEntity(brickService.create(request));
    }

    @PostMapping("admin/bricks/import/check")
    public List<RowCheckDto> checkList(@RequestBody List<AdminBrickDto> requests) {
        return brickService.checkList(requests);
    }

    @PostMapping("admin/bricks/import")
    @ResponseStatus(HttpStatus.CREATED)
    public List<AdminBrickDto> importList(@Valid @RequestBody List<AdminBrickDto> requests) {
        return brickService.importList(requests).stream().map(AdminBrickDto::fromEntity).toList();
    }

    @PostMapping("admin/bricks/update")
    public AdminBrickDto update(@Valid @RequestBody AdminBrickDto request) {
        return AdminBrickDto.fromEntity(brickService.update(request));
    }
}