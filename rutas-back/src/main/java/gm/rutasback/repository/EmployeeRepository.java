package gm.rutasback.repository;

import gm.rutasback.model.City;
import gm.rutasback.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByCityAndActiveTrue(City city);
    boolean existsByIdAndRoutesNotEmpty(Long employeeId);
}
