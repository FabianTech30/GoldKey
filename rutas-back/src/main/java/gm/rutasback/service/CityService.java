package gm.rutasback.service;

import gm.rutasback.model.City;
import gm.rutasback.repository.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {
    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    public City getCityById(Long id) {
        Optional<City> city = cityRepository.findById(id);
        return city.orElseThrow(() -> new IllegalArgumentException("Ciudad no encontrada"));
    }
}
