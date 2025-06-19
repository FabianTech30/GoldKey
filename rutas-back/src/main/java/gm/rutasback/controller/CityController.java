package gm.rutasback.controller;

import gm.rutasback.dto.GetAllCitiesCityResponseDTO;
import gm.rutasback.dto.GetEmployeesByCityIdEmployeeResponseDTO;
import gm.rutasback.model.City;
import gm.rutasback.model.Employee;
import gm.rutasback.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cities")
public class CityController {
    @Autowired
    private CityService cityService;

    @GetMapping
    public List<GetAllCitiesCityResponseDTO> getAllCities() {
        return cityService.getAllCities()
                .stream()
                .map(city -> new GetAllCitiesCityResponseDTO(city.getId(), city.getName()))
                .toList();
    }

    @GetMapping("/{id}")
    public GetAllCitiesCityResponseDTO getCityById(@PathVariable Long id) {
        City city = cityService.getCityById(id);
        return new GetAllCitiesCityResponseDTO(city.getId(), city.getName());
    }

    @GetMapping("/{id}/employees")
    public List<GetEmployeesByCityIdEmployeeResponseDTO> getEmployeesByCityId(@PathVariable Long id) {
        return cityService.getCityById(id).getEmployees()
                .stream()
                .filter(Employee::getActive)
                .map(employee -> new GetEmployeesByCityIdEmployeeResponseDTO(employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getMotherLastName(), employee.getBirthDate(), employee.getSalary(), employee.getActive()))
                .toList();

    }

}
