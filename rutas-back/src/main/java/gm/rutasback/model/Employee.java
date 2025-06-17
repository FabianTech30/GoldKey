package gm.rutasback.model;

import jakarta.persistence.*;

import java.time.LocalDate;

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

    @one

}
