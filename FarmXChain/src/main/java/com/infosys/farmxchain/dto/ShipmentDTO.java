package com.infosys.farmxchain.dto;

import com.infosys.farmxchain.entity.ShipmentStatus;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class ShipmentDTO {
    private Long id;
    private Long orderId;
    private String currentLocation;
    private Double temperature;
    private Double humidity;
    private ShipmentStatus status;
    private LocalDateTime lastUpdated;
    private String blockchainTxHash;
}
