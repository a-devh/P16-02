package ksu.p1602.bricks.controller;

import ksu.p1602.bricks.model.Brick;
import ksu.p1602.bricks.service.BrickService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/bricks")
@RequiredArgsConstructor
public class BrickController {
    private final BrickService brickService;

    @GetMapping("/getall")
    public List<Brick> getAllBricks() {
        return brickService.getAllBricks();
    }

    @GetMapping("/search")
    public List<Brick> search(@RequestParam(required = false) String q) {
        return brickService.search(q);
    }
}

