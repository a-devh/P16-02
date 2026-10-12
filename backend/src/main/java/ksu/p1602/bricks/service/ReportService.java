package ksu.p1602.bricks.service;

import java.math.BigDecimal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ksu.p1602.bricks.dto.ReportSummaryDto;
import ksu.p1602.bricks.model.Brick;
import ksu.p1602.bricks.model.Brick.Campus;
import ksu.p1602.bricks.repository.ReportRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReportService {
    
    private final ReportRepository reportRepository;
    
    private static final BigDecimal BRICK_PRICE = new BigDecimal("100.00");

    public ReportSummaryDto summary() {
        long total = reportRepository.countByDeletedFalse();
        long totalKennesaw = reportRepository.countByCampusAndDeletedFalse(Campus.Kennesaw);
        long totalMarietta = reportRepository.countByCampusAndDeletedFalse(Campus.Marietta);
        BigDecimal fundsRaised = BRICK_PRICE.multiply(BigDecimal.valueOf(total));
        long potentialDuplicates = reportRepository.countPotentialDuplicates();
        long removedBricks = reportRepository.countByDeletedTrue();
        
        return new ReportSummaryDto(
            total,
            totalKennesaw,
            totalMarietta,
            fundsRaised,
            potentialDuplicates,
            removedBricks
        );

    }

    public Page<Brick> duplicates(int page, int size) {
        return reportRepository.potentialDuplicateBricks(pageOf(page, size));
    }

    public Page<Brick> removed(int page, int size) {
        return reportRepository.findByDeletedTrue(pageOf(page, size));
    }

    private Pageable pageOf(int page, int size) {
        return PageRequest.of(Math.max(page, 0), Math.max(size, 1));
    }
}
