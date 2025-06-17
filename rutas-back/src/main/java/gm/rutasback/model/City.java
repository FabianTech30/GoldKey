package gm.rutasback.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(names = "cities")
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

    //CONSTRUCTORS, GETTERS, SETTERS
    publico City() {}

    public City(String name) {
        this.name = name;
    }

    //GETTERS AND SETTERS
    public Long


}
