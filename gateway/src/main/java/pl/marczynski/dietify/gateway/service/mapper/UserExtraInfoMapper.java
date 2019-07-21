package pl.marczynski.dietify.gateway.service.mapper;

import pl.marczynski.dietify.gateway.domain.*;
import pl.marczynski.dietify.gateway.service.dto.UserExtraInfoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserExtraInfo} and its DTO {@link UserExtraInfoDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface UserExtraInfoMapper extends EntityMapper<UserExtraInfoDTO, UserExtraInfo> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    UserExtraInfoDTO toDto(UserExtraInfo userExtraInfo);

    @Mapping(source = "userId", target = "user")
    UserExtraInfo toEntity(UserExtraInfoDTO userExtraInfoDTO);

    default UserExtraInfo fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserExtraInfo userExtraInfo = new UserExtraInfo();
        userExtraInfo.setId(id);
        return userExtraInfo;
    }
}
