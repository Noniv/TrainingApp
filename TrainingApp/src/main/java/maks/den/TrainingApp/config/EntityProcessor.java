package maks.den.TrainingApp.config;

import maks.den.TrainingApp.entity.Training;
import org.springframework.context.annotation.Configuration;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelProcessor;

@Configuration
public class EntityProcessor implements RepresentationModelProcessor<EntityModel<Training>> {
    @Override
    public EntityModel<Training> process (EntityModel<Training> model) {
        return EntityModel.of(model.getContent());
    }
}
