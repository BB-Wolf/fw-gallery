import axios from 'axios'
import { notifications } from 'main/state';

export const tokenHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getUserProfile = () => axios.get('//furry-world.ru/console/get_user_profile.php', tokenHeader());
export const getUserFolders = () => axios.get('//furry-world.ru/console/get_user_folders.php', tokenHeader());
export const updatePassword = async (formData) => {
    if (this.userNewPassword === this.userConfirmPassword) {
        formData.append('password', this.userNewPassword);
        formData.append('confirm', this.userConfirmPassword);
        let sendPasswordRequest = await new axios.post('//furry-world.ru/console/post_update_password.php', formData, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }

        });
        if (sendPasswordRequest.data && sendPasswordRequest.data.status == 'success') {
            notifications.generateNotification('Успех', sendPasswordRequest.data.text);

        } else {
            notifications.generateNotification('Ошибка', sendPasswordRequest.data.text);

        }

    } else {
        notifications.generateNotification('Ошибка', 'Пароли не совпадают');
    }
}

export const fetchTags = async (tag) => {
    const lookUpTag = await axios.get('//furry-world.ru/console/get_search_tags.php?q=' + tag);

    if (lookUpTag.data) {
        document.querySelector('.filter-go').classList.add('filter-go--active');
        return lookUpTag.data;
    } else {
        //  return { label: 'По запросу ничего не найдено' };
    }
}

const API_URL = '//furry-world.ru/console';
const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export async function saveCharacter({
    name,
    age,
    species,
    short,
    full,
    file,
    ismentionable,
    istradeable,
    charheader,
    rate
}) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('species', species);
    formData.append('short', short);
    formData.append('full', full);
    formData.append('file', file);
    formData.append('ismentionable', ismentionable);
    formData.append('istradeable', istradeable);
    formData.append('charheader', charheader);
    formData.append('rate', rate);

    try {
        const res = await axios.post(`${API_URL}/post_create_character.php`, formData, authHeader());
        notifications.generateNotification(res.data.status, res.data.text);
        return res.data;
    } catch {
        notifications.generateNotification('bad', 'Ошибка сохранения персонажа');
        throw new Error('saveCharacter failed');
    }
}

export async function getUserCharacters() {
    try {
        const res = await axios.get(`${API_URL}/get_user_characters.php`, authHeader());
        return res.data;
    } catch {
        notifications.generateNotification('bad', 'Ошибка загрузки списка персонажей');
        return [];
    }
}

export async function getUserFavs(userLogin) {
    const res = await axios.get(`${API_URL}/get_user_favs.php?user=${userLogin}`, authHeader());
    return res.data;
}

export async function saveAvatar(file) {
    const avatarData = new FormData();
    avatarData.append('file', file);

    const res = await axios.post(`${API_URL}/post_update_profile.php?mode=avatar`, avatarData, authHeader());
    if (res.data?.status === 'success') {
        notifications.generateNotification('Успех', 'Аватар успешно сохранён');
    } else {
        notifications.generateNotification('Ошибка', res.data?.text || 'Ошибка загрузки');
    }
    return res.data;
}

export async function saveFields(fields, username) {
    const fieldsData = new FormData();
    fieldsData.append('fields', JSON.stringify(fields));
    fieldsData.append('username', username);

    const res = await axios.post(`${API_URL}/post_update_profile.php?mode=fields`, fieldsData, authHeader());
    if (res.data?.status === 'success') {
        notifications.generateNotification('Успех', res.data.text);
    }
    return res.data;
}

export async function saveStatus(status) {
    try {
        const res = await axios.get(
            `${API_URL}/get_update_user_status.php?mode=${status}&token=${localStorage.getItem('token')}`
        );
        notifications.generateNotification(res.data.status === 'success' ? 'Успех' : 'Ошибка', res.data.text);
        return res.data;
    } catch {
        notifications.generateNotification('Ошибка', 'Ошибка обновления данных');
        throw new Error('saveStatus failed');
    }
}