import { useApp } from '../context/AppContext';
import scenariosData from '../data/scenarios.json';

export function useRoleState() {
  const { state, dispatch } = useApp();

  function selectRole(roleId) {
    const role = scenariosData.roles.find(r => r.id === roleId);
    if (role) {
      dispatch({ type: 'SELECT_ROLE', payload: role });
    }
  }

  function resetAll() {
    dispatch({ type: 'RESET' });
  }

  function getRoleById(roleId) {
    return scenariosData.roles.find(r => r.id === roleId);
  }

  return {
    selectedRole: state.selectedRole,
    allRoles: scenariosData.roles,
    selectRole,
    resetAll,
    getRoleById,
    isRoleSelected: !!state.selectedRole,
    biasHistory: state.biasHistory,
  };
}
