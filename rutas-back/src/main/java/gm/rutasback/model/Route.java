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
    

}
