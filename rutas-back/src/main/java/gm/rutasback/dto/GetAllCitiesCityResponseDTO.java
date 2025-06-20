package gm.rutasback.dto;

import gm.rutasback.model.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class GetAllCitiesCityResponseDTO {
    private Long id;
    private String name;
    private List<GetAllCitiesCityEmployeeResponseDTO> employees;

    public GetAllCitiesCityResponseDTO(Long id, String name, List<Employee> employees) {
        this.id = id;
        this.name = name;
        this.employees = employees.stream().map(employee -> new GetAllCitiesCityEmployeeResponseDTO(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getMotherLastName(),
                employee.getBirthDate(),
                employee.getSalary(),
                employee.getActive()
        )).toList();
    }
}

@Getter
@AllArgsConstructor
class GetAllCitiesCityEmployeeResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String motherLastName;
    private LocalDate birthDate;
    private Double salary;
    private Boolean active;
}
