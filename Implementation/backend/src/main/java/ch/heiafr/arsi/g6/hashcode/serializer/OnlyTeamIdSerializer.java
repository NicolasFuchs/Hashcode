package ch.heiafr.arsi.g6.hashcode.serializer;

import ch.heiafr.arsi.g6.hashcode.model.Team;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.util.List;

public class OnlyTeamIdSerializer extends JsonSerializer<List<Team>> {

  @Override
  public void serialize(List<Team> value, JsonGenerator gen, SerializerProvider serializers)
      throws IOException {
    gen.writeStartArray();
    for (Team team : value) {
      gen.writeStartObject();
      gen.writeNumberField("teamId", team.getTeamId());
      gen.writeEndObject();
    }
    gen.writeEndArray();
  }
}
