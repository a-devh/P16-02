package ksu.p1602.bricks.config;
 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
 
import java.util.Optional;
 
@Configuration
@EnableJpaAuditing
public class AuditConfig {
 
    // Placeholder until auth exists; swap for the logged-in user's username later
    @Bean
    public AuditorAware<String> auditorAware() {
        return () -> Optional.of("system");
    }
}
 
