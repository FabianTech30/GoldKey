package gm.rutasback.model;

import jakarta.persistence.*;

@Entity
@Table(name = "routes")
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
    public Route() {}

    public Route(String name, RouteType type, Integer capacity, City city, Employee driver) {
        this.name = name;
        this.type = type;
        this.capacity = capacity;
        this.city = city;
        this.driver = driver;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public RouteType getType() { return type; }
    public void setType(RouteType type) { this.type = type; }
    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    public City getCity() { return city; }
    public void setCity(City city) { this.city = city; }
    public Employee getDriver() { return driver; }
    public void setDriver(Employee driver) { this.driver = driver; }
}

