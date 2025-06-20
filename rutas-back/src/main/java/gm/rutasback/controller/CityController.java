package gm.rutasback.controller;

import gm.rutasback.dto.GetAllCitiesCityResponseDTO;
import gm.rutasback.dto.GetEmployeesByCityIdEmployeeResponseDTO;
import gm.rutasback.dto.GetRoutesByCityIdRouteResponseDTO;
import gm.rutasback.model.City;
import gm.rutasback.model.Employee;
import gm.rutasback.service.CityService;
import gm.rutasback.service.RouteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/cities")
public class CityController {
    private final CityService cityService;

    private final RouteService routeService;

    public CityController(CityService cityService, RouteService routeService) {
        this.cityService = cityService;
        this.routeService = routeService;
    }

    @GetMapping
    public ResponseEntity<List<GetAllCitiesCityResponseDTO>> getAllCities() {
        List<GetAllCitiesCityResponseDTO> cities = cityService.getAllCities()
                .stream()
                .map(city -> new GetAllCitiesCityResponseDTO(city.getId(), city.getName(), city.getEmployees()))
                .toList();

        return ResponseEntity.ok(cities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetAllCitiesCityResponseDTO> getCityById(@PathVariable Long id) {
        City city = cityService.getCityById(id);

        return ResponseEntity.ok(new GetAllCitiesCityResponseDTO(city.getId(), city.getName(), city.getEmployees()));
    }

    @GetMapping("/{id}/employees")
    public ResponseEntity<List<GetEmployeesByCityIdEmployeeResponseDTO>> getEmployeesByCityId(@PathVariable Long id) {
        return ResponseEntity.ok(cityService.getCityById(id).getEmployees()
                .stream()
                .filter(Employee::getActive)
                .map(employee -> new GetEmployeesByCityIdEmployeeResponseDTO(employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getMotherLastName(), employee.getBirthDate(), employee.getSalary(), employee.getActive()))
                .toList());
    }

    @GetMapping("/{id}/routes")
    public ResponseEntity<List<GetRoutesByCityIdRouteResponseDTO>> getRoutesByCityId(@PathVariable Long id) {
        City city = cityService.getCityById(id);

        if (city == null) {
            throw new IllegalArgumentException("City not found");
        }

        return ResponseEntity.ok(
                routeService.getRoutesByCity(city).stream().map(
                        route -> new GetRoutesByCityIdRouteResponseDTO(
                                route.getId(),
                                route.getName(),
                                route.getType(),
                                route.getCapacity()
                        )
                ).toList()
        );
    }
}
