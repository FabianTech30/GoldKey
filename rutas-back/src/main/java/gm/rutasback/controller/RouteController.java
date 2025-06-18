package gm.rutasback.controller;

import gm.rutasback.dto.RouteDTO;
import gm.rutasback.model.City;
import gm.rutasback.model.Employee;
import gm.rutasback.model.Route;
import gm.rutasback.model.RouteType;
import gm.rutasback.service.CityService;
import gm.rutasback.service.EmployeeService;
import gm.rutasback.service.RouteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/routes")
public class RouteController {
    @Autowired
    private RouteService routeService;

    @Autowired
    private CityService cityService;

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/city/{cityId}")
    public List<Route>getRouteByCity(@PathVariable Long cityId) {
        City city = cityService.getCityById(cityId);
        if (city == null) {
            throw new IllegalArgumentException("City not found");
        }
        return routeService.getRoutesByCity(city);
    }

    @GetMapping("/search")
    public List<Route>searchRoutes(
            @RequestParam Long cityId,
            @RequestParam String name) {
        City city = cityService.getCityById(cityId);
        if (city == null) {
            throw new IllegalArgumentException("City not found");
        }
        return routeService.searchRoutesByCityAndName(city, name);
    }

    @PostMapping
    public ResponseEntity<Route> createRoute(@Valid @RequestBody RouteDTO routeDTO) {
        City city = cityService.getCityById(routeDTO.getCityId());
        if(city == null){
            throw new IllegalArgumentException("City not found");
        }
        Employee driver = employeeService.getActiveEmployeesByCity(city).stream()
                .filter(e -> e.getId().equals(routeDTO.getCityId()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Driver not found or not available for this city"));

        Route route = new Route(
                routeDTO.getName(),
                routeDTO.getType(),
                routeDTO.getCapacity(),
                city,
                driver
        );

        Route savedRoute = routeService.createRoute(route);
        return ResponseEntity.created(URI.create("/api/routes/" + savedRoute.getId()))
                .body(savedRoute);

    }

    @PutMapping("/{id}")
    public Route updateRoute(
            @PathVariable Long id,
            @RequestParam RouteType type,
            @RequestParam Integer capacity,
            @RequestParam Long driverId) {
        Route route = routeService.getRoutesByCity(null).stream()
                .filter(r -> r.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Route not found"));

        Employee driver = employeeService.getActiveEmployeesByCity(route.getCity()).stream()
                .filter(e -> e.getId().equals(driverId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Driver not fount or not available for this city"));

        return routeService.updateRoute(id,type,capacity,driver);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteRoute(@PathVariable Long id) {
        routeService.deleteRoute(id);
        return ResponseEntity.noContent().build();
    }
}
