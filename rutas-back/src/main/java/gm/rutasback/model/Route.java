package gm.rutasback.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "routes")
@Data
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 15)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RouteType type;

    @Column(nullable = false)
    private Integer capacity;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private Employee driver;

    // Constructors, getters, setters
    public Route() {
    }

    public Route(String name, RouteType type, Integer capacity, City city, Employee driver) {
        this.name = name;
        this.type = type;
        this.capacity = capacity;
        this.city = city;
        this.driver = driver;
    }

}

