package gm.rutasback.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "cities")
@Data
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;

    @OneToMany(mappedBy = "city")
    private List<Employee> employees;

    @OneToMany(mappedBy = "city")
    private List<Route> routes;

    // Constructors, getters, setters
    public City() {
    }

    public City(String name) {
        this.name = name;
    }

}
