package ksu.p1602.bricks;

import ksu.p1602.bricks.controller.BrickController;
import ksu.p1602.bricks.dto.BrickDto;
import ksu.p1602.bricks.model.Brick;
import ksu.p1602.bricks.service.BrickService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.OffsetDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class BricksApplicationTests {

    @Mock
    private BrickService brickService;

    @InjectMocks
    private BrickController brickController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(brickController).build();
    }



    private static Brick brick(Long id, String name, String inscription,
                               Brick.Campus campus, Brick.Section section, Integer number) {
        Brick b = new Brick();
        ReflectionTestUtils.setField(b, "id", id);
        ReflectionTestUtils.setField(b, "createdAt", OffsetDateTime.parse("2026-01-01T12:00:00Z"));
        ReflectionTestUtils.setField(b, "updatedAt", OffsetDateTime.parse("2026-01-02T12:00:00Z"));
        ReflectionTestUtils.setField(b, "createdBy", "test.user@example.com");
        ReflectionTestUtils.setField(b, "updatedBy", "test.user@example.com");
        b.setName(name);
        b.setInscription(inscription);
        b.setCampus(campus);
        b.setSection(section);
        b.setNumber(number);
        return b;
    }

    private static PageImpl<Brick> pageOf(Brick... bricks) {
        return new PageImpl<>(List.of(bricks), PageRequest.of(0, 25), bricks.length);
    }


    @Test
    void brickDto_fromEntity_mapsAllFields() {
        Brick b = brick(7L, "Jane Doe", "Class of 2020", Brick.Campus.Kennesaw, Brick.Section.C, 42);

        BrickDto dto = BrickDto.fromEntity(b);

        assertEquals(7L, dto.id());
        assertEquals("Jane Doe", dto.name());
        assertEquals("Class of 2020", dto.inscription());
        assertEquals(Brick.Campus.Kennesaw, dto.campus());
        assertEquals(Brick.Section.C, dto.section());
        assertEquals(42, dto.number());
    }

    @Test
    void brickDto_fromEntity_allowsNullOptionalFields() {
        Brick b = brick(1L, null, null, Brick.Campus.Marietta, Brick.Section.A, null);

        BrickDto dto = BrickDto.fromEntity(b);

        assertNull(dto.name());
        assertNull(dto.inscription());
        assertNull(dto.number());
        assertEquals(Brick.Campus.Marietta, dto.campus());
        assertEquals(Brick.Section.A, dto.section());
    }

    @Test
    void brick_isNotDeletedByDefault() {
        assertEquals(false, new Brick().isDeleted());
    }

    @Test
    void brick_enumsContainExpectedValues() {
        assertEquals(2, Brick.Campus.values().length);
        assertEquals(12, Brick.Section.values().length);
        assertEquals(Brick.Section.A, Brick.Section.valueOf("A"));
        assertEquals(Brick.Section.L, Brick.Section.valueOf("L"));
    }

    @Test
    void userSearch_withNoParams_usesDefaultsAndExcludesDeleted() throws Exception {
        when(brickService.search(isNull(), isNull(), isNull(), eq(false), eq(0), eq(25)))
                .thenReturn(pageOf(brick(1L, "Jane", "Hi", Brick.Campus.Kennesaw, Brick.Section.A, 1)));

        mockMvc.perform(get("/api/user/bricks/search"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(1))
                .andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].name").value("Jane"))
                .andExpect(jsonPath("$.content[0].campus").value("Kennesaw"))
                .andExpect(jsonPath("$.content[0].section").value("A"))
                .andExpect(jsonPath("$.content[0].number").value(1));

        verify(brickService).search(null, null, null, false, 0, 25);
    }

    @Test
    void userSearch_passesAllFiltersToService() throws Exception {
        when(brickService.search("smith", Brick.Campus.Marietta, Brick.Section.F, false, 2, 10))
                .thenReturn(pageOf());

        mockMvc.perform(get("/api/user/bricks/search")
                        .param("q", "smith")
                        .param("campus", "Marietta")
                        .param("section", "F")
                        .param("page", "2")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(0));

        verify(brickService).search("smith", Brick.Campus.Marietta, Brick.Section.F, false, 2, 10);
    }

    @Test
    void userSearch_capsPageSizeAtFifty() throws Exception {
        when(brickService.search(isNull(), isNull(), isNull(), eq(false), eq(0), eq(50)))
                .thenReturn(pageOf());

        mockMvc.perform(get("/api/user/bricks/search").param("size", "500"))
                .andExpect(status().isOk());

        verify(brickService).search(null, null, null, false, 0, 50);
    }

    @Test
    void userSearch_sizeOfExactlyFifty_isNotReduced() throws Exception {
        when(brickService.search(isNull(), isNull(), isNull(), eq(false), eq(0), eq(50)))
                .thenReturn(pageOf());

        mockMvc.perform(get("/api/user/bricks/search").param("size", "50"))
                .andExpect(status().isOk());

        verify(brickService).search(null, null, null, false, 0, 50);
    }

    @Test
    void userSearch_invalidCampus_returnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/user/bricks/search").param("campus", "Atlantis"))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(brickService);
    }

    @Test
    void userSearch_invalidSection_returnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/user/bricks/search").param("section", "Z"))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(brickService);
    }

    @Test
    void userSearch_nonNumericPage_returnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/user/bricks/search").param("page", "abc"))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(brickService);
    }

    @Test
    void userGet_returnsBrickAndExcludesDeleted() throws Exception {
        when(brickService.getById(5L, false))
                .thenReturn(brick(5L, "John", "Go Owls", Brick.Campus.Kennesaw, Brick.Section.B, 12));

        mockMvc.perform(get("/api/user/bricks/5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(5))
                .andExpect(jsonPath("$.name").value("John"))
                .andExpect(jsonPath("$.inscription").value("Go Owls"))
                .andExpect(jsonPath("$.campus").value("Kennesaw"))
                .andExpect(jsonPath("$.section").value("B"))
                .andExpect(jsonPath("$.number").value(12));

        verify(brickService).getById(5L, false);
    }

    @Test
    void userGet_nonNumericId_returnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/user/bricks/not-a-number"))
                .andExpect(status().isBadRequest());

        verify(brickService, never()).getById(org.mockito.ArgumentMatchers.anyLong(),
                org.mockito.ArgumentMatchers.any());
    }

    @Test
    void adminSearch_defaultsToNonDeleted() throws Exception {
        when(brickService.search(isNull(), isNull(), isNull(), eq(false), eq(0), eq(25)))
                .thenReturn(pageOf(brick(1L, "Jane", "Hi", Brick.Campus.Kennesaw, Brick.Section.A, 1)));

        mockMvc.perform(get("/api/admin/bricks/search"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(1));

        verify(brickService).search(null, null, null, false, 0, 25);
    }

    @Test
    void adminSearch_canRequestDeletedBricks() throws Exception {
        when(brickService.search("old", Brick.Campus.Kennesaw, Brick.Section.D, true, 1, 5))
                .thenReturn(pageOf(brick(9L, "Old", "Gone", Brick.Campus.Kennesaw, Brick.Section.D, 3)));

        mockMvc.perform(get("/api/admin/bricks/search")
                        .param("q", "old")
                        .param("campus", "Kennesaw")
                        .param("section", "D")
                        .param("deleted", "true")
                        .param("page", "1")
                        .param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(1));

        verify(brickService).search("old", Brick.Campus.Kennesaw, Brick.Section.D, true, 1, 5);
    }

    @Test
    void adminSearch_capsPageSizeAtFifty() throws Exception {
        when(brickService.search(isNull(), isNull(), isNull(), eq(false), eq(0), eq(50)))
                .thenReturn(pageOf());

        mockMvc.perform(get("/api/admin/bricks/search").param("size", "1000"))
                .andExpect(status().isOk());

        verify(brickService).search(null, null, null, false, 0, 50);
    }

    @Test
    void adminSearch_invalidDeletedFlag_returnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/admin/bricks/search").param("deleted", "maybe"))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(brickService);
    }

    @Test
    void adminGet_passesNullDeletedFilterSoDeletedBricksAreVisible() throws Exception {
        when(brickService.getById(eq(3L), isNull()))
                .thenReturn(brick(3L, "Deleted One", "x", Brick.Campus.Marietta, Brick.Section.E, 8));

        mockMvc.perform(get("/api/admin/bricks/3"))
                .andExpect(status().isOk());

        verify(brickService).getById(3L, null);
    }

    @Test
    void adminGet_nonNumericId_returnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/admin/bricks/abc"))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(brickService);
    }
}