package gm.rutasback.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "employees")
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
    private double salary;

    @Column(nullable = false)
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @OneToMany(mappedBy = "driver")
    private Set<Route> routes;


    //CONSTRUCCTORS, GETTERS, SETTERS
    public Employee() {}

    public Employee(String firstName, String lastName, String motherLastName, LocalDate birthDate, Double salary, City city) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.motherLastName = motherLastName;
        this.birthDate = birthDate;
        this.salary = salary;
        this.city = city;

    }
    // GETTERS AND SETTERS

}
