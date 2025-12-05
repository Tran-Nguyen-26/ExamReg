package com.examreg.examreg.service;
import java.util.List;
import com.examreg.examreg.models.Location;
import com.examreg.examreg.dto.response.LocationResponse;


public interface ILocationService {
    List<LocationResponse> getAllLocations();
}
