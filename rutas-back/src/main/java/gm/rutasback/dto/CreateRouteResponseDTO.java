package gm.rutasback.dto;

import gm.rutasback.model.RouteType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CreateRouteResponseDTO {
    private Long id;
    private String name;
    private RouteType type;
    private Integer capacity;
}
