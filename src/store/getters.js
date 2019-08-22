const getters = {
	user_id: state => state.user.userinfo.id,
	role: state => state.user.userinfo.role,
	username: state => state.user.userinfo.username,
	token: state => state.user.userinfo.token,
	menu: state => state.user.userinfo.menu,
	collapsed: state => state.global.global.collapsed,
	sider_with: state => state.global.global.sider_with,
	menu_role: state => state.global.global.menu_role,
}
export default getters
