package gm.rutasback.dto;

import gm.rutasback.model.RouteType;
import jakarta.validation.constraints.*;

public class RouteDTO {
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(max = 15, message = "Name cannot exceed 15 characters")
    @Pattern(regexp = "^[a-zA-Z0-9 ]+$", message = "Name can only contain alphanumeric characters")
    private String name;

    @NotNull(message = "Type is required")
    private RouteType type;

    @NotNull(message = "Capacity is required")
    @Positive(message = "Capacity must be positive")
    private Integer capacity;

    @NotNull(message = "City ID is required")
    private Long cityId;

    @NotNull(message = "Driver ID is required")
    private Long driverId;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public RouteType getType() { return type; }
    public void setType(RouteType type) { this.type = type; }
    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    public Long getCityId() { return cityId; }
    public void setCityId(Long cityId) { this.cityId = cityId; }
    public Long getDriverId() { return driverId; }
    public void setDriverId(Long driverId) { this.driverId = driverId; }
}