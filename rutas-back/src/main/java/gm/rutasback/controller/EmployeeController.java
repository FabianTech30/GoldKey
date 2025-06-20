package gm.rutasback.controller;

import gm.rutasback.dto.CreateEmployeeRequestDTO;
import gm.rutasback.dto.CreateEmployeeResponseDTO;
import gm.rutasback.dto.UpdateEmployeeResponseDTO;
import gm.rutasback.model.City;
import gm.rutasback.model.Employee;
import gm.rutasback.service.CityService;
import gm.rutasback.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    private final CityService cityService;

    public EmployeeController(EmployeeService employeeService, CityService cityService) {
        this.employeeService = employeeService;
        this.cityService = cityService;
    }

    @PostMapping
    public ResponseEntity<CreateEmployeeResponseDTO> createEmployee(@Valid @RequestBody CreateEmployeeRequestDTO createEmployeeRequestDTO) {
        City city = cityService.getCityById(createEmployeeRequestDTO.getCityId());
        if (city == null) {
            throw new IllegalArgumentException("City not found");
        }

        Employee employee = new Employee(
                createEmployeeRequestDTO.getFirstName(),
                createEmployeeRequestDTO.getLastName(),
                createEmployeeRequestDTO.getMotherLastName(),
                createEmployeeRequestDTO.getBirthDate(),
                createEmployeeRequestDTO.getSalary(),
                city,
                true
        );

        Employee savedEmployee = employeeService.createEmployee(employee);
        return ResponseEntity.ok(new CreateEmployeeResponseDTO(
                savedEmployee.getId(),
                savedEmployee.getFirstName(),
                savedEmployee.getLastName(),
                savedEmployee.getMotherLastName(),
                savedEmployee.getBirthDate(),
                savedEmployee.getSalary(),
                savedEmployee.getActive()
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UpdateEmployeeResponseDTO> updateEmployee(
            @PathVariable Long id,
            @RequestParam LocalDate birthDate,
            @RequestParam Double salary) {
        Employee employee = employeeService.updateEmployee(id, birthDate, salary);
        return ResponseEntity.ok(new UpdateEmployeeResponseDTO(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getMotherLastName(),
                employee.getBirthDate(),
                employee.getSalary(),
                employee.getActive()
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok().build();
    }
}