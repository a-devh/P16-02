package ksu.p1602.bricks.service;

import ksu.p1602.bricks.model.Brick;
import ksu.p1602.bricks.repository.BrickRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BrickService {
    private final BrickRepository brickRepository;

    public List<Brick> getAllBricks() {
        return brickRepository.findByDeletedFalse();
    }

    public List<Brick> search(String q) {
        if (q == null || q.isBlank()) {
            return brickRepository.findByDeletedFalse();
        }
        return brickRepository.search(q.trim());
    }
}