package gm.rutasback.model;


import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "cities")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;

    @OneToMany(mappedBy = "city")
    private Set<Employee> employees;

    @OneToMany(mappedBy = "city")
    private Set<Route> routes;

    // Constructors, getters, setters
    public City() {}

    public City(String name) {
        this.name = name;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Set<Employee> getEmployees() { return employees; }
    public void setEmployees(Set<Employee> employees) { this.employees = employees; }
    public Set<Route> getRoutes() { return routes; }
    public void setRoutes(Set<Route> routes) { this.routes = routes; }
}
