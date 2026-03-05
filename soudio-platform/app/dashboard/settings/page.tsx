"use client";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, Check, AlertCircle, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

type AlertType = { type: "success" | "error"; message: string } | null;

function Alert({ alert }: { alert: AlertType }) {
  if (!alert) return null;
  return (
    <div
      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium ${
        alert.type === "success"
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-red-50 text-red-700 border border-red-200"
      }`}
    >
      {alert.type === "success" ? (
        <Check className="w-4 h-4 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
      )}
      {alert.message}
    </div>
  );
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileAlert, setProfileAlert] = useState<AlertType>(null);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [savingPass, setSavingPass] = useState(false);
  const [passAlert, setPassAlert] = useState<AlertType>(null);

  // Load profile
  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          setProfile({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            phone: res.data.phone || "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleProfileSave = async () => {
    setSavingProfile(true);
    setProfileAlert(null);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProfileAlert({ type: "success", message: "تم تحديث البيانات بنجاح" });
        setEditMode(false);
      } else {
        setProfileAlert({ type: "error", message: data.error || "حدث خطأ" });
      }
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPassAlert({ type: "error", message: "كلمة المرور الجديدة وتأكيدها غير متطابقتين" });
      return;
    }
    setSavingPass(true);
    setPassAlert(null);
    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwords),
      });
      const data = await res.json();
      if (data.success) {
        setPassAlert({ type: "success", message: "تم تغيير كلمة المرور بنجاح" });
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setPassAlert({ type: "error", message: data.error || "حدث خطأ" });
      }
    } finally {
      setSavingPass(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Profile section */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
          <h2 className="font-black text-xl text-neutral-900">بيانات الحساب</h2>
          {!editMode && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditMode(true)}
              icon={<Edit2 className="w-4 h-4" />}
            >
              تعديل البيانات
            </Button>
          )}
        </div>

        {profileAlert && (
          <div className="mb-5">
            <Alert alert={profileAlert} />
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                الاسم الأول <span className="text-red-400">*</span>
              </label>
              <input
                className="input-rtl"
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
                disabled={!editMode}
                placeholder="الاسم الأول"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                اسم العائلة <span className="text-red-400">*</span>
              </label>
              <input
                className="input-rtl"
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
                disabled={!editMode}
                placeholder="اسم العائلة"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
              البريد الإلكتروني
            </label>
            <input
              className="input-rtl opacity-60 cursor-not-allowed"
              value={profile.email}
              disabled
              dir="ltr"
            />
            <p className="text-xs text-neutral-400 mt-1">
              لا يمكن تغيير البريد الإلكتروني. تواصل مع الدعم إذا احتجت لذلك.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
              رقم الجوال
            </label>
            <input
              className="input-rtl"
              value={profile.phone || ""}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              disabled={!editMode}
              placeholder="+966 5XXXXXXXX"
              dir="ltr"
            />
          </div>

          {editMode && (
            <div className="flex gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleProfileSave}
                loading={savingProfile}
              >
                حفظ التغييرات
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={() => {
                  setEditMode(false);
                  setProfileAlert(null);
                }}
              >
                إلغاء
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Password section */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
          <h2 className="font-black text-xl text-neutral-900">كلمة المرور</h2>
          <Button
            variant="ghost"
            size="sm"
            icon={<Edit2 className="w-4 h-4" />}
          >
            تعديل كلمة المرور
          </Button>
        </div>

        {passAlert && (
          <div className="mb-5">
            <Alert alert={passAlert} />
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          {[
            {
              key: "currentPassword" as const,
              label: "كلمة المرور الحالية",
              showKey: "current" as const,
            },
            {
              key: "newPassword" as const,
              label: "كلمة المرور الجديدة",
              showKey: "new" as const,
            },
            {
              key: "confirmPassword" as const,
              label: "تأكيد كلمة المرور الجديدة",
              showKey: "confirm" as const,
            },
          ].map(({ key, label, showKey }) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                {label} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPass[showKey] ? "text" : "password"}
                  className="input-rtl pe-10"
                  value={passwords[key]}
                  onChange={(e) =>
                    setPasswords({ ...passwords, [key]: e.target.value })
                  }
                  placeholder="••••••••"
                  required
                  minLength={key !== "currentPassword" ? 8 : 1}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPass({ ...showPass, [showKey]: !showPass[showKey] })
                  }
                  className="absolute start-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPass[showKey] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={savingPass}
            >
              تحديث كلمة المرور
            </Button>
          </div>
        </form>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-card p-6 md:p-8">
        <h2 className="font-black text-xl text-red-700 mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          منطقة الخطر
        </h2>
        <p className="text-sm text-neutral-500 mb-5">
          حذف الحساب إجراء دائم ولا يمكن التراجع عنه. جميع بياناتك وصورك ستُحذف نهائياً.
        </p>
        <Button
          variant="ghost"
          size="md"
          className="text-red-600 hover:bg-red-50 border border-red-200"
          icon={<Trash2 className="w-4 h-4" />}
          onClick={() => {
            if (confirm("هل أنت متأكد تماماً من حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه.")) {
              alert("سيتم التواصل معك من فريق الدعم لتأكيد الحذف");
            }
          }}
        >
          حذف الحساب
        </Button>
      </div>
    </div>
  );
}
