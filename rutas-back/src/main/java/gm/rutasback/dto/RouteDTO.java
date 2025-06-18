package gm.rutasback.dto;

import gm.rutasback.model.RouteType;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
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

}