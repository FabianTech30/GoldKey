package gm.rutasback.controller;

import gm.rutasback.dto.CreateRouteResponseDTO;
import gm.rutasback.dto.RouteDTO;
import gm.rutasback.dto.SearchRoutesRouteResponseDTO;
import gm.rutasback.dto.UpdateRouteResponseDTO;
import gm.rutasback.model.City;
import gm.rutasback.model.Employee;
import gm.rutasback.model.Route;
import gm.rutasback.model.RouteType;
import gm.rutasback.service.CityService;
import gm.rutasback.service.EmployeeService;
import gm.rutasback.service.RouteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/routes")
public class RouteController {
    private final RouteService routeService;

    private final CityService cityService;

    private final EmployeeService employeeService;

    public RouteController(RouteService routeService, CityService cityService, EmployeeService employeeService) {
        this.routeService = routeService;
        this.cityService = cityService;
        this.employeeService = employeeService;
    }

    @GetMapping("/{id}/routes")
    public ResponseEntity<List<SearchRoutesRouteResponseDTO>> searchRoutes(
            @PathVariable Long id) {
        City city = cityService.getCityById(id);

        return ResponseEntity.ok(
                city.getRoutes().stream().map(
                        route -> new SearchRoutesRouteResponseDTO(
                                route.getId(),
                                route.getName(),
                                route.getType(),
                                route.getCapacity()
                        )
                ).toList()
        );
    }

    @PostMapping
    public ResponseEntity<CreateRouteResponseDTO> createRoute(@Valid @RequestBody RouteDTO routeDTO) {
        City city = cityService.getCityById(routeDTO.getCityId());

        Employee driver = employeeService.getActiveEmployeesByCity(city).stream()
                .filter(e -> e.getId().equals(routeDTO.getCityId()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Empleado no encontrado"));

        Route route = new Route(
                routeDTO.getName(),
                routeDTO.getType(),
                routeDTO.getCapacity(),
                city,
                driver
        );

        Route savedRoute = routeService.createRoute(route);

        return ResponseEntity.ok(new CreateRouteResponseDTO(
                savedRoute.getId(),
                savedRoute.getName(),
                savedRoute.getType(),
                savedRoute.getCapacity()
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UpdateRouteResponseDTO> updateRoute(
            @PathVariable Long id,
            @RequestParam RouteType type,
            @RequestParam Integer capacity,
            @RequestParam Long driverId,
            @RequestParam String name,
            @RequestParam Long cityId
    ) {
        Employee driver = employeeService.findEmployeeById(driverId);
        Route route = routeService.updateRoute(id, type, capacity, driver,
                name, cityId);

        return ResponseEntity.ok(new UpdateRouteResponseDTO(
                route.getId(),
                route.getName(),
                route.getType(),
                route.getCapacity()
        ));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteRoute(@PathVariable Long id) {
        routeService.deleteRoute(id);
        return ResponseEntity.noContent().build();
    }
}
