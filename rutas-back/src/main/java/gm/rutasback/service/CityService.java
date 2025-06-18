package gm.rutasback.service;

import gm.rutasback.model.City;
import gm.rutasback.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {
    @Autowired
    private CityRepository cityRepository;

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    public City getCityById(Long id) {
        //return cityRepository.findById(id).orElse(null);
        Optional<City> city = cityRepository.findById(id);
        return city.orElseThrow(() -> new IllegalArgumentException("Error: City not found"));
    }
}
