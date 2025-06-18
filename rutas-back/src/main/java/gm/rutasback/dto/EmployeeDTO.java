package gm.rutasback.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeDTO {
    private Long id;

    @NotBlank(message = "First name is required")
    @Size(max = 15, message = "First name cannot exceed 15 characters")
    @Pattern(regexp = "^[a-zA-Z ]+$", message = "First name can only contain letters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 15, message = "Last name cannot exceed 15 characters")
    @Pattern(regexp = "^[a-zA-Z ]+$", message = "Last name can only contain letters")
    private String lastName;

    @Size(max = 15, message = "Mother's last name cannot exceed 15 characters")
    @Pattern(regexp = "^[a-zA-Z ]*$", message = "Mother's last name can only contain letters")
    private String motherLastName;

    @NotNull(message = "Birth date is required")
    @Past(message = "Birth date must be in the past")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @NotNull(message = "Salary is required")
    @Positive(message = "Salary must be positive")
    private Double salary;

    @NotNull(message = "City ID is required")
    private Long cityId;

}

