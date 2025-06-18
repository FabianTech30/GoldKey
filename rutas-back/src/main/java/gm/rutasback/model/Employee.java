package gm.rutasback.model;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "employees")
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 15)
    private String firstName;

    @Column(nullable = false, length = 15)
    private String lastName;

    @Column(length = 15)
    private String motherLastName;

    @Column(nullable = false)
    private LocalDate birthDate;

    @Column(nullable = false)
    private Double salary;

    @Column(nullable = false)
    private Boolean active = true;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @OneToMany(mappedBy = "driver")
    private List<Route> routes;

    // Constructors, getters, setters
    public Employee() {}

    public Employee(String firstName, String lastName, String motherLastName,
                    LocalDate birthDate, Double salary, City city) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.motherLastName = motherLastName;
        this.birthDate = birthDate;
        this.salary = salary;
        this.city = city;
    }

}