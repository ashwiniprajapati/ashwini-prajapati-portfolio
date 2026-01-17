import React, { useState, useEffect, useRef, useCallback } from "react";
import { PROFILE } from "./constants";
import { Experience, Project, SkillCategory } from "./types";

// --- Custom Hook for Responsive View ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

// --- Components ---

const TaskbarIcon: React.FC<{
  id: string;
  title: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ id, title, icon, isActive, onClick }) => (
  <div onClick={onClick} className={`taskbar-item ${isActive ? "active" : ""}`}>
    <i className={`${icon} sm:mr-2`}></i>
    <span className="truncate hidden sm:inline">{title}</span>
  </div>
);

const DesktopIcon: React.FC<{
  title: string;
  icon: string;
  onClick: () => void;
}> = ({ title, icon, onClick }) => (
  <div className="desktop-icon" onDoubleClick={onClick} onClick={onClick}>
    <div className="icon-img">
      <i className={icon}></i>
    </div>
    <span>{title}</span>
  </div>
);

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isMobileView: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: React.ReactNode;
  zIndex: number;
  onClick: () => void;
  position: { x: number; y: number };
  onDrag: (id: string, x: number, y: number) => void;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  isOpen,
  isMinimized,
  isMaximized,
  isMobileView,
  onClose,
  onMinimize,
  onMaximize,
  children,
  zIndex,
  onClick,
  position,
  onDrag,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isMobileView) return;
    onClick();
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      onDrag(
        id,
        e.clientX - dragOffset.current.x,
        e.clientY - dragOffset.current.y,
      );
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, id, onDrag]);

  if (!isOpen || isMinimized) return null;

  // If mobile, always treat as maximized but with room for taskbar
  const shouldBeMaximized = isMaximized || isMobileView;

  const style: React.CSSProperties = shouldBeMaximized
    ? {
        zIndex,
        top: 0,
        left: 0,
        width: "100%",
        height: "calc(100vh - 30px)",
        position: "absolute",
        borderRadius: 0,
        borderWidth: isMobileView ? "1px" : "3px",
      }
    : {
        zIndex,
        top: position.y,
        left: position.x,
        width: "70%",
        height: "70%",
        position: "absolute",
      };

  return (
    <div className="xp-window flex flex-col" style={style} onClick={onClick}>
      <div
        className="xp-window-titlebar cursor-default select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center overflow-hidden pointer-events-none">
          <i className={`${icon} mr-2 text-[11px] flex-shrink-0`}></i>
          <span className="truncate pr-4">{title}</span>
        </div>
        <div className="xp-window-controls flex-shrink-0">
          {!isMobileView && (
            <div
              className="xp-btn xp-btn-min"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
            >
              _
            </div>
          )}
          {!isMobileView && (
            <div
              className="xp-btn xp-btn-max"
              onClick={(e) => {
                e.stopPropagation();
                onMaximize();
              }}
            >
              {isMaximized ? "❐" : "□"}
            </div>
          )}
          <div
            className="xp-btn xp-btn-close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            ✕
          </div>
        </div>
      </div>
      <div className="xp-window-content flex-1 overflow-hidden">
        <div className="bg-white p-4 sm:p-6 h-full overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Login Screen ---

const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const isMobile = useIsMobile();
  return (
    <div className="xp-login-screen">
      <div className="xp-login-bar xp-login-top"></div>

      <div className="xp-login-middle">
        <div className="flex flex-col items-center select-none w-full sm:w-1/2">
          <div className="flex flex-col items-center">
            <div className="flex gap-2 mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-sm bg-[#f44336] shadow-md border border-white/20"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-sm bg-[#4caf50] shadow-md border border-white/20"></div>
            </div>
            <div className="flex gap-2 -mt-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-sm bg-[#2196f3] shadow-md border border-white/20"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-sm bg-[#ffeb3b] shadow-md border border-white/20"></div>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <div className="text-white text-3xl sm:text-5xl font-bold xp-logo-text italic tracking-tighter">
                Microsoft
              </div>
              <div className="text-white text-2xl sm:text-4xl font-bold flex items-baseline leading-none mt-1">
                Windows{" "}
                <span className="text-lg sm:text-xl font-normal ml-2 italic opacity-80">
                  xp
                </span>
              </div>
            </div>
          </div>
        </div>

        {!isMobile && <div className="xp-login-divider"></div>}

        <div className="flex flex-col w-full sm:w-1/2 mt-8 sm:mt-0 sm:pl-10 items-center sm:items-start">
          <div className="text-white italic text-sm sm:text-lg mb-4 sm:mb-8 font-medium shadow-sm">
            To begin, click your user name
          </div>
          <div
            className="xp-login-user-card group max-w-[280px]"
            onClick={onLogin}
          >
            <div className="relative mr-4">
              <img
                src={PROFILE.profilePicture}
                alt={PROFILE.name}
                className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] object-cover rounded-md border-2 border-white shadow-lg group-hover:brightness-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="xp-login-user-name text-base sm:text-lg group-hover:text-blue-200">
                {PROFILE.name}
              </span>
              <span className="text-white opacity-80 text-xs">Logged Off</span>
            </div>
          </div>
        </div>
      </div>

      <div className="xp-login-bar xp-login-bottom">
        <div className="flex items-center group cursor-pointer text-white">
          <div className="w-8 h-8 rounded-lg bg-[#cc0000] flex items-center justify-center mr-3 group-hover:bg-[#ff0000] shadow-md border border-white/20">
            <i className="fas fa-power-off text-sm"></i>
          </div>
          <span className="text-sm font-bold shadow-sm">Turn off computer</span>
        </div>
        <div className="hidden sm:block text-white opacity-70 text-[11px] italic max-w-[260px] text-right leading-tight">
          After you log on, you can add or change accounts. Just go to Control
          Panel and click User Accounts.
        </div>
      </div>
    </div>
  );
};

// --- Log Off Dialog ---

const LogOffDialog: React.FC<{
  onCancel: () => void;
  onLogOff: () => void;
}> = ({ onCancel, onLogOff }) => {
  return (
    <div className="xp-overlay">
      <div className="xp-logoff-box">
        <div className="xp-logoff-header">
          <span>Log Off Windows</span>
          <i className="fab fa-windows text-white text-lg"></i>
        </div>
        <div className="xp-logoff-body">
          <div className="xp-logoff-option" onClick={onCancel}>
            <div className="xp-logoff-icon-btn switch">
              <i className="fas fa-users text-white text-xl"></i>
            </div>
            <span>Switch User</span>
          </div>
          <div className="xp-logoff-option" onClick={onLogOff}>
            <div className="xp-logoff-icon-btn logoff">
              <i className="fas fa-sign-out-alt text-white text-xl"></i>
            </div>
            <span>Log Off</span>
          </div>
        </div>
        <div className="xp-logoff-footer">
          <button className="xp-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogOffDialogOpen, setIsLogOffDialogOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<string[]>(["about"]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [maximizedWindows, setMaximizedWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string>("about");
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  const [windowPositions, setWindowPositions] = useState<
    Record<string, { x: number; y: number }>
  >({
    about: { x: 40, y: 40 },
    experience: { x: 60, y: 60 },
    skills: { x: 80, y: 80 },
    projects: { x: 100, y: 100 },
    contact: { x: 120, y: 120 },
  });

  const [zIndices, setZIndices] = useState<Record<string, number>>({
    about: 10,
    experience: 1,
    skills: 1,
    projects: 1,
    contact: 1,
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleActualLogOff = () => {
    setIsLoggedIn(false);
    setIsLogOffDialogOpen(false);
    setOpenWindows(["about"]);
    setMinimizedWindows([]);
    setMaximizedWindows([]);
    setActiveWindow("about");
    setZIndices({
      about: 10,
      experience: 1,
      skills: 1,
      projects: 1,
      contact: 1,
    });
    setWindowPositions({
      about: { x: 40, y: 40 },
      experience: { x: 60, y: 60 },
      skills: { x: 80, y: 80 },
      projects: { x: 100, y: 100 },
      contact: { x: 120, y: 120 },
    });
    setIsStartMenuOpen(false);
  };

  const openWindow = (id: string) => {
    if (!openWindows.includes(id)) {
      setOpenWindows([...openWindows, id]);
    }
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows(minimizedWindows.filter((w) => w !== id));
    }
    focusWindow(id);
    setIsStartMenuOpen(false);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter((w) => w !== id));
    setMinimizedWindows(minimizedWindows.filter((w) => w !== id));
    setMaximizedWindows(maximizedWindows.filter((w) => w !== id));
    if (activeWindow === id) {
      const remaining = openWindows.filter((w) => w !== id);
      setActiveWindow(remaining[remaining.length - 1] || "");
    }
  };

  const toggleMinimize = (id: string) => {
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows(minimizedWindows.filter((w) => w !== id));
      focusWindow(id);
    } else {
      setMinimizedWindows([...minimizedWindows, id]);
      const remaining = openWindows.filter(
        (w) => w !== id && !minimizedWindows.includes(w),
      );
      if (remaining.length > 0) {
        focusWindow(remaining[remaining.length - 1]);
      } else {
        setActiveWindow("");
      }
    }
  };

  const toggleMaximize = (id: string) => {
    if (maximizedWindows.includes(id)) {
      setMaximizedWindows(maximizedWindows.filter((w) => w !== id));
    } else {
      setMaximizedWindows([...maximizedWindows, id]);
    }
    focusWindow(id);
  };

  const focusWindow = (id: string) => {
    const maxZ = Math.max(...Object.values(zIndices), 10);
    setZIndices((prev) => ({ ...prev, [id]: maxZ + 1 }));
    setActiveWindow(id);
  };

  const handleWindowDrag = useCallback((id: string, x: number, y: number) => {
    setWindowPositions((prev) => ({
      ...prev,
      [id]: { x, y },
    }));
  }, []);

  const handleTaskbarClick = (id: string) => {
    if (activeWindow === id && !minimizedWindows.includes(id)) {
      toggleMinimize(id);
    } else {
      openWindow(id);
    }
  };

  const toggleStartMenu = () => setIsStartMenuOpen(!isStartMenuOpen);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const windows = [
    { id: "about", title: "My Profile", icon: "fas fa-user" },
    { id: "experience", title: "Work History", icon: "fas fa-briefcase" },
    { id: "skills", title: "Technical Skills", icon: "fas fa-tools" },
    { id: "projects", title: "Recent Projects", icon: "fas fa-code-branch" },
    { id: "contact", title: "Contact Ashwini", icon: "fas fa-envelope" },
  ];

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="xp-desktop overflow-hidden">
      {/* Desktop Icons */}
      <div className="flex flex-col h-full p-2 sm:p-4 flex-wrap content-start">
        {windows.map((win) => (
          <DesktopIcon
            key={win.id}
            title={win.title}
            icon={win.icon}
            onClick={() => openWindow(win.id)}
          />
        ))}
      </div>

      {/* Windows Content */}
      {windows.map((win) => (
        <Window
          key={win.id}
          id={win.id}
          title={
            win.id === "about" ? `My Profile - ${PROFILE.name}` : win.title
          }
          icon={win.icon}
          isOpen={openWindows.includes(win.id)}
          isMinimized={minimizedWindows.includes(win.id)}
          isMaximized={maximizedWindows.includes(win.id)}
          isMobileView={isMobile}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => toggleMinimize(win.id)}
          onMaximize={() => toggleMaximize(win.id)}
          zIndex={zIndices[win.id] || 1}
          onClick={() => focusWindow(win.id)}
          position={windowPositions[win.id]}
          onDrag={handleWindowDrag}
        >
          {win.id === "about" && (
            <div className="max-w-3xl">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-center sm:text-left">
                <img
                  src={PROFILE.profilePicture}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-blue-500 shadow-lg object-cover"
                  alt="Profile"
                />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                    {PROFILE.name}
                  </h1>
                  <p className="text-lg sm:text-xl text-blue-600 font-semibold">
                    {PROFILE.title}
                  </p>
                  <p className="text-slate-500 mt-1 font-medium text-sm sm:text-base">
                    <i className="fas fa-map-marker-alt mr-2 text-red-500"></i>
                    {PROFILE.location}
                  </p>
                </div>
              </div>
              <h2 className="text-lg sm:text-xl font-bold border-b-2 border-slate-200 pb-2 mb-4 text-slate-800">
                Professional Summary
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                {PROFILE.summary}
              </p>

              <h2 className="text-lg sm:text-xl font-bold border-b-2 border-slate-200 pb-2 mb-4 text-slate-800">
                Education
              </h2>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                  {PROFILE.education.degree}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {PROFILE.education.institution} | {PROFILE.education.period}
                </p>
                <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold mt-2">
                  {PROFILE.education.score}
                </div>
              </div>
            </div>
          )}
          {win.id === "experience" && (
            <div className="space-y-6 sm:space-y-8">
              {PROFILE.experiences.map((exp, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4 py-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800">
                      {exp.role}
                    </h3>
                    <span className="text-[10px] sm:text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100 self-start sm:self-auto mt-1 sm:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-blue-700 font-bold mb-3 text-sm sm:text-base">
                    {exp.company}
                  </p>
                  <ul className="list-disc list-inside text-slate-600 text-xs sm:text-sm space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {win.id === "skills" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {PROFILE.skills.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200"
                >
                  <h3 className="font-bold text-slate-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <i className="fas fa-tools text-blue-600 text-[10px] sm:text-xs"></i>
                    </div>
                    {cat.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <span
                        key={i}
                        className="bg-white border border-slate-300 px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs text-slate-700 font-bold shadow-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {win.id === "projects" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {PROFILE.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="h-24 sm:h-32 bg-slate-100 flex items-center justify-center text-3xl sm:text-5xl text-slate-300 transition-transform group-hover:scale-105">
                    <i className="fas fa-laptop-code"></i>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-base sm:text-lg mb-2 text-slate-800">
                      {proj.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 mb-4 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {proj.techUsed.map((t, i) => (
                        <span
                          key={i}
                          className="text-[9px] sm:text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {win.id === "contact" && (
            <div className="text-center py-6 sm:py-10">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 text-2xl sm:text-4xl shadow-xl ring-4 ring-blue-50">
                <i className="fas fa-paper-plane"></i>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-slate-800">
                Let's Connect!
              </h2>
              <p className="text-slate-500 mb-6 sm:mb-10 max-w-md mx-auto px-4 font-medium text-sm sm:text-base">
                I'm currently open for new opportunities and collaborations.
              </p>
              <div className="space-y-3 sm:space-y-4 max-w-sm mx-auto px-4">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center justify-center w-full bg-blue-600 text-white py-3 sm:py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 px-4 overflow-hidden text-sm sm:text-base"
                >
                  <i className="fas fa-envelope mr-3"></i>{" "}
                  <span className="truncate">{PROFILE.email}</span>
                </a>
                <a
                  href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center w-full border-2 border-slate-200 text-slate-700 py-3 sm:py-4 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95 text-sm sm:text-base"
                >
                  <i className="fas fa-phone mr-3"></i> {PROFILE.phone}
                </a>
                <a
                  href={`https://${PROFILE.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-[#0077b5] text-white py-3 sm:py-4 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg active:scale-95 text-sm sm:text-base"
                >
                  <i className="fab fa-linkedin mr-3"></i> LinkedIn
                </a>
              </div>
            </div>
          )}
        </Window>
      ))}

      {/* Taskbar */}
      <div className="xp-taskbar select-none">
        <div className="xp-start-button" onClick={toggleStartMenu}>
          <i className="fab fa-windows mr-1 sm:mr-2 text-lg sm:text-xl shadow-sm"></i>
          <span className="hidden xs:inline">start</span>
        </div>

        <div className="flex-1 flex px-1 sm:px-2 gap-1 overflow-x-auto scrollbar-hide">
          {openWindows.map((id) => {
            const win = windows.find((w) => w.id === id);
            return win ? (
              <TaskbarIcon
                key={id}
                id={id}
                title={win.title}
                icon={win.icon}
                isActive={activeWindow === id && !minimizedWindows.includes(id)}
                onClick={() => handleTaskbarClick(id)}
              />
            ) : null;
          })}
        </div>

        <div className="xp-system-tray pr-2 sm:pr-3">
          <i className="fas fa-volume-up mr-2 sm:mr-3 opacity-70 hidden sm:inline text-[10px] text-white"></i>
          <span className="font-bold text-[10px] sm:text-[11px] tracking-tight text-white">
            {formattedTime}
          </span>
        </div>
      </div>

      {/* Log Off Overlay */}
      {isLogOffDialogOpen && (
        <LogOffDialog
          onCancel={() => setIsLogOffDialogOpen(false)}
          onLogOff={handleActualLogOff}
        />
      )}

      {/* Start Menu */}
      {isStartMenuOpen && (
        <div className="xp-start-menu">
          <div className="xp-start-header">
            <img
              src={PROFILE.profilePicture}
              className="w-10 h-10 rounded-sm border-2 border-white/80 mr-3 shadow-sm object-cover"
              alt="Avatar"
            />
            <span className="font-bold text-white text-sm shadow-md truncate">
              {PROFILE.name}
            </span>
          </div>
          <div className="xp-start-body">
            <div className="xp-start-left">
              {windows.map((win) => (
                <div
                  key={win.id}
                  className="start-item"
                  onClick={() => openWindow(win.id)}
                >
                  <div className="w-7 h-7 flex items-center justify-center mr-3 text-blue-600 text-lg">
                    <i className={win.icon}></i>
                  </div>
                  <span className="font-medium text-[12px]">{win.title}</span>
                </div>
              ))}
              <div className="border-t border-slate-200 mt-2 sm:mt-4 pt-2">
                <div className="start-item">
                  <i className="fas fa-folder-open mr-3 text-orange-400"></i>
                  All Programs
                </div>
              </div>
            </div>
            {!isMobile && (
              <div className="xp-start-right">
                <div className="start-item" onClick={() => openWindow("about")}>
                  My Documents
                </div>
                <div className="start-item">My Recent Documents</div>
                <div className="start-item">My Pictures</div>
                <div className="start-item">My Music</div>
                <div className="start-item">My Computer</div>
                <div className="h-[1px] bg-blue-300 my-2 mx-3"></div>
                <div className="start-item">Control Panel</div>
                <div className="start-item">Printers and Faxes</div>
                <div className="h-[1px] bg-blue-300 my-2 mx-3"></div>
                <div className="start-item">Help and Support</div>
                <div className="start-item">Search</div>
                <div className="start-item">Run...</div>
              </div>
            )}
          </div>
          <div className="xp-start-footer">
            <button
              onClick={() => {
                setIsLogOffDialogOpen(true);
                setIsStartMenuOpen(false);
              }}
              className="flex items-center text-[10px] sm:text-xs text-white font-bold hover:brightness-125 px-1 sm:px-2"
            >
              <i className="fas fa-key mr-1 sm:mr-2 text-orange-400"></i> Log
              Off
            </button>
            <button className="flex items-center text-[10px] sm:text-xs text-white font-bold hover:brightness-125 px-1 sm:px-2">
              <i className="fas fa-power-off mr-1 sm:mr-2 text-red-500"></i>{" "}
              Turn Off
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
