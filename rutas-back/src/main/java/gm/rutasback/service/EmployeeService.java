package gm.rutasback.service;

import com.cormex.model.City;
import com.cormex.model.Employee;
import com.cormex.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getActiveEmployeesByCity(City city) {
        return employeeRepository.findByCityAndActiveTrue(city);
    }

    @Transactional
    public Employee createEmployee(Employee employee) throws IllegalArgumentException {
        validateEmployee(employee);
        return employeeRepository.save(employee);
    }

    @Transactional
    public Employee updateEmployee(Long id, LocalDate birthDate, Double salary) throws IllegalArgumentException {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));

        validateAge(birthDate);
        employee.setBirthDate(birthDate);
        employee.setSalary(salary);

        return employeeRepository.save(employee);
    }

    @Transactional
    public void deleteEmployee(Long id) throws IllegalStateException {
        if (employeeRepository.existsByIdAndRoutesNotEmpty(id)) {
            throw new IllegalStateException("Cannot delete employee with assigned routes");
        }
        employeeRepository.deleteById(id);
    }

    private void validateEmployee(Employee employee) {
        validateAge(employee.getBirthDate());

        if (employee.getSalary() <= 0) {
            throw new IllegalArgumentException("Salary must be greater than zero");
        }
    }

    private void validateAge(LocalDate birthDate) {
        if (Period.between(birthDate, LocalDate.now()).getYears() < 18) {
            throw new IllegalArgumentException("Employee must be at least 18 years old");
        }
    }
}