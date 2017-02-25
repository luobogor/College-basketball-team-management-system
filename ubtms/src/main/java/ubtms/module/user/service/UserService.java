package ubtms.module.user.service;

import ubtms.basic.entity.LimitObjet;
import ubtms.module.user.dto.PlayerDataDto;
import ubtms.module.user.entity.PlayerData;
import ubtms.module.user.entity.User;
import ubtms.module.user.entity.UserExample;
import ubtms.module.user.entity.UserQuery;

import java.util.List;

/**
 * Created by jinzhany on 2016/12/8.
 */
public interface UserService {
    User selectOne(User user);
    List<User> select(User user);
    List<User> selectWithRelative(LimitObjet<User> user);
    List<User> selectByUserQuery(UserQuery userQuery);
    List<User> selectBySchoolName(String schoolName);
    int countWithRelative(User user);
    List<User> selectByExample(UserExample userExample);
    int countByExample(UserExample userExample);
    int updateByPrimaryKey(List<User> users);
    boolean isUserAccountExist(String account);
    int saveUser(String headPic,String sex,String userType,String userName,String schoolName,String account,String password,String grade,String height,String weight,String shirtNum,String duty);
    int[] getTeamScore(Integer gameId);
    PlayerData getLastData();
    int savePlayData(PlayerData playerData);
    int updateMySchoolPlayerData(List<PlayerDataDto> playerDatas);
    int updateRivalPlayerData(Integer gameId,List<PlayerDataDto> playerDataDtos);
    List<PlayerDataDto> getMySchoolPlayerData(Integer gameId);
    List<PlayerDataDto> getRivalPlayerData(Integer gameId);
}
