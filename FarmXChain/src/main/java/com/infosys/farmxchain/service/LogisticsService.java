package com.infosys.farmxchain.service;

import com.infosys.farmxchain.dto.ShipmentDTO;
import com.infosys.farmxchain.entity.Order;
import com.infosys.farmxchain.entity.OrderStatus;
import com.infosys.farmxchain.entity.Shipment;
import com.infosys.farmxchain.entity.ShipmentStatus;
import com.infosys.farmxchain.exception.ResourceNotFoundException;
import com.infosys.farmxchain.repository.OrderRepository;
import com.infosys.farmxchain.repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LogisticsService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BlockchainService blockchainService;

    public ShipmentDTO createShipment(Long orderId, Long farmerUserId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        if (!order.getFarmer().getUser().getId().equals(farmerUserId)) {
            throw new RuntimeException("Unauthorized: Only the farmer who owns this order can start a shipment.");
        }

        if (order.getStatus() != OrderStatus.ACCEPTED) {
            throw new RuntimeException("Order must be accepted before shipping");
        }

        Shipment shipment = Shipment.builder()
                .order(order)
                .status(ShipmentStatus.IN_TRANSIT)
                .currentLocation(order.getFarmer().getFarmLocation())
                .build();

        order.setStatus(OrderStatus.SHIPPED);
        orderRepository.save(order);

        return convertToDTO(shipmentRepository.save(shipment));
    }

    public ShipmentDTO updateShipment(Long shipmentId, String location, Double temperature, Double humidity, ShipmentStatus status) {
        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found with id: " + shipmentId));

        shipment.setCurrentLocation(location);
        shipment.setTemperature(temperature);
        shipment.setHumidity(humidity);
        shipment.setStatus(status);

        if (status == ShipmentStatus.DELIVERED) {
            shipment.getOrder().setStatus(OrderStatus.DELIVERED);
            orderRepository.save(shipment.getOrder());
        }

        // Blockchain logging
        String conditionData = "Temp: " + temperature + ", Hum: " + humidity;
        String txHash = blockchainService.logShipment(shipment.getOrder().getId(), location, conditionData);
        shipment.setBlockchainTxHash(txHash);

        return convertToDTO(shipmentRepository.save(shipment));
    }

    public ShipmentDTO getShipmentByOrderId(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        
        Shipment shipment = shipmentRepository.findByOrder(order)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment tracking not found for order id: " + orderId));
        
        return convertToDTO(shipment);
    }

    private ShipmentDTO convertToDTO(Shipment shipment) {
        return ShipmentDTO.builder()
                .id(shipment.getId())
                .orderId(shipment.getOrder().getId())
                .currentLocation(shipment.getCurrentLocation())
                .temperature(shipment.getTemperature())
                .humidity(shipment.getHumidity())
                .status(shipment.getStatus())
                .lastUpdated(shipment.getLastUpdated())
                .blockchainTxHash(shipment.getBlockchainTxHash())
                .build();
    }
}
