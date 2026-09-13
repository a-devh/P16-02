package ksu.p1602.bricks.controller;
import ksu.p1602.bricks.model.Brick;
import ksu.p1602.bricks.repository.BrickRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/api/bricks")
public class BrickController {
    private final BrickRepository brickRepository;
    public BrickController(BrickRepository brickRepository) {
        this.brickRepository = brickRepository;
    }

    @GetMapping 
    public List<Brick> getAllBricks() {
        return brickRepository.findAll();
    }
}