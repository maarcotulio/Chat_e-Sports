import { Group } from "@/@types/chat";

export default function ListGroups({
  groups,
  selectedGroup,
  handleSelectGroup,
}: {
  groups: Group[];
  selectedGroup: Group | null;
  handleSelectGroup: (group: Group) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto">
      {groups.map((group: Group) => (
        <div
          key={group.id}
          className={`flex items-center p-3 border-b border-gray-800 cursor-pointer ${
            selectedGroup?.id === group.id ? "bg-gray-900" : "hover:bg-gray-900"
          }`}
          onClick={() => handleSelectGroup(group)}
        >
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-100 font-bold flex-shrink-0">
            {group.icon}
          </div>
          <div className="ml-3 flex-1 overflow-hidden">
            <div className="flex justify-between items-center">
              <span className="font-medium text-white">{group.name}</span>
              <span className="text-xs text-gray-400">{group.time}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-gray-300 truncate">
                {group.lastMessage}
              </p>
              {group.unread && (
                <span className="bg-red-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {group.unread}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
