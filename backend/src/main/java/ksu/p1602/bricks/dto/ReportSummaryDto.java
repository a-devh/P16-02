package ksu.p1602.bricks.dto;

import java.math.BigDecimal;

public record ReportSummaryDto(
    long totalBricks,
    long totalKennesaw,
    long totalMarietta,
    BigDecimal fundsRaised,
    long potentialDuplicates,
    long removedBricks
) {}
