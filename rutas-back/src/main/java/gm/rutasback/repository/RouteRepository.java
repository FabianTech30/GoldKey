package gm.rutasback.repository;

import gm.rutasback.model.City;
import gm.rutasback.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    List<Route> findByCity(City city);
}
