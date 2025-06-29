package gm.rutasback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class GetEmployeesByCityIdEmployeeResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String motherLastName;
    private LocalDate birthDate;
    private Double salary;
    private Boolean active;
}
