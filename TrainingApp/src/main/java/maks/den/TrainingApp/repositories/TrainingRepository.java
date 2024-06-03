package maks.den.TrainingApp.repositories;

import maks.den.TrainingApp.entity.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TrainingRepository extends JpaRepository<Training, Integer> {
    @Query(value = "SELECT * FROM TRAINING", nativeQuery = true)
    List<Training> findAll();

    @Query(value = "SELECT AVG(duration) FROM TRAINING", nativeQuery = true)
    Number averageDuration();
}
