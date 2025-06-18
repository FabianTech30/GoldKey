package gm.rutasback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetCityByIdResponseDTO {
    private Long id;
    private String name;
}
