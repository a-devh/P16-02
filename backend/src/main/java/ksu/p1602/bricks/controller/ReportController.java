package ksu.p1602.bricks.controller;

import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ksu.p1602.bricks.dto.AdminBrickDto;
import ksu.p1602.bricks.dto.ReportSummaryDto;
import ksu.p1602.bricks.service.ReportService;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/reports")
public class ReportController {
    private final ReportService reportService;

    @GetMapping("/summary")
    public ReportSummaryDto getSummary() {
        return reportService.summary();
    }

    @GetMapping("/duplicates")
    public Page<AdminBrickDto> duplicates(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "25") int size
    ) {
        return reportService.duplicates(page, Math.min(size, 50)).map(AdminBrickDto::fromEntity);
    }

    @GetMapping("/removed")
    public Page<AdminBrickDto> removed(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "25") int size
    ) {
        return reportService.removed(page, Math.min(size, 50)).map(AdminBrickDto::fromEntity);
    }
}

