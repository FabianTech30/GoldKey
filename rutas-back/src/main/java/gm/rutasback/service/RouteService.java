package gm.rutasback.service;

import gm.rutasback.model.City;
import gm.rutasback.model.Employee;
import gm.rutasback.model.Route;
import gm.rutasback.model.RouteType;
import gm.rutasback.repository.CityRepository;
import gm.rutasback.repository.RouteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RouteService {
    private final RouteRepository routeRepository;
    private final CityRepository cityRepository;
    private final EmployeeService employeeService;

    public RouteService(RouteRepository routeRepository, CityRepository cityRepository, EmployeeService employeeService) {
        this.routeRepository = routeRepository;
        this.cityRepository = cityRepository;
        this.employeeService = employeeService;
    }

    public List<Route> getRoutesByCity(City city) {
        return routeRepository.findByCity(city);
    }

    @Transactional
    public Route createRoute(Route route) throws IllegalArgumentException {
        validateRoute(route);
        return routeRepository.save(route);
    }

    @Transactional
    public Route updateRoute(Long id, RouteType type, Integer capacity, Employee driver,
                             String name, Long cityId) throws IllegalArgumentException {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Route not found"));

        validateCapacity(type, capacity);

        route.setType(type);
        route.setCapacity(capacity);
        route.setDriver(driver);
        route.setName(name);
        City city = cityRepository.findById(cityId)
                .orElseThrow(() -> new IllegalArgumentException("City not found"));
        route.setCity(city);

        return routeRepository.save(route);
    }

    @Transactional
    public void deleteRoute(Long id) {
        routeRepository.deleteById(id);
    }

    private void validateRoute(Route route) {
        if (route.getName() == null || route.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Route name is required");
        }

        if (!route.getName().matches("^[a-zA-Z0-9 ]+$")) {
            throw new IllegalArgumentException("Route name can only contain alphanumeric characters");
        }

        if (route.getName().length() > 15) {
            throw new IllegalArgumentException("Route name cannot exceed 15 characters");
        }

        validateCapacity(route.getType(), route.getCapacity());

        if (route.getDriver() == null) {
            throw new IllegalArgumentException("Driver is required");
        }

        // Check if driver is active and belongs to the same city
        List<Employee> availableDrivers = employeeService.getActiveEmployeesByCity(route.getCity());
        if (availableDrivers.stream().noneMatch(d -> d.getId().equals(route.getDriver().getId()))) {
            throw new IllegalArgumentException("Selected driver is not available for this city");
        }
    }

    private void validateCapacity(RouteType type, Integer capacity) {
        if (capacity == null || capacity <= 0) {
            throw new IllegalArgumentException("Capacity must be greater than zero");
        }

        int maxCapacity = (type == RouteType.ITEMS) ? 100 : 34;
        if (capacity > maxCapacity) {
            throw new IllegalArgumentException("Capacity exceeds maximum allowed for " + type + ": " + maxCapacity);
        }
    }
}
