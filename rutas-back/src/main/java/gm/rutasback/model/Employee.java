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
    private Double salary;

    @Column(nullable = false)
    private Boolean active = true;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @OneToMany(mappedBy = "driver")
    private Set<Route> routes;

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

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getMotherLastName() { return motherLastName; }
    public void setMotherLastName(String motherLastName) { this.motherLastName = motherLastName; }
    public LocalDate getBirthDate() { return birthDate; }
    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }
    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public City getCity() { return city; }
    public void setCity(City city) { this.city = city; }
    public Set<Route> getRoutes() { return routes; }
    public void setRoutes(Set<Route> routes) { this.routes = routes; }
}