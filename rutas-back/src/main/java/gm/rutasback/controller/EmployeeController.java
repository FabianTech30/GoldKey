package gm.rutasback.controller;


import gm.rutasback.dto.EmployeeDTO;
import gm.rutasback.model.City;
import gm.rutasback.model.Employee;
import gm.rutasback.service.CityService;
import gm.rutasback.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    CityService cityService;

    @GetMapping("/city/{cityId}")
    public List<Employee> getActiveEmployeesByCity(@PathVariable Long cityId) {
        City city = cityService.getCityById(cityId);
        if (city == null) {
            throw new IllegalArgumentException("City not found");
        }
        return employeeService.getActiveEmployeesByCity(city);
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody EmployeeDTO employeeDTO){
        City city = cityService.getCityById(employeeDTO.getCityId());
        if (city == null) {
            throw new IllegalArgumentException("City not found");
        }
        Employee employee = new Employee(
          employeeDTO.getFirstName(),
          employeeDTO.getLastName(),
          employeeDTO.getMotherLastName(),
          employeeDTO.getBirthDate(),
          employeeDTO.getSalary(),
          city
        );

        Employee savedEmployee = employeeService.createEmployee(employee);
        return ResponseEntity.created(URI.create("/api/employees/"+ savedEmployee.getId())).body(savedEmployee);
    }

    @PutMapping("/{id}")
    public Employee updateEmployee(
            @PathVariable Long id,
            @RequestParam LocalDate birthDate,
            @RequestParam Double salary) {
        return employeeService.updateEmployee(id, birthDate, salary);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

}
