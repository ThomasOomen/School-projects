
using UnityEngine;

public class SoundManagerScript : MonoBehaviour
{
    public static AudioClip EatingSound;
    public static AudioSource audioData;
    void Start()
    {
        EatingSound = Resources.Load<AudioClip>("EatingSound");
        audioData = GetComponent<AudioSource>();

    }

    // Update is called once per frame
    void Update()
    {

    }

    public static void PlaySound(string clip)
    {
        switch (clip)
        {
            case "Eating":
                //audioData.PlayOneShot(EatingSound, 0.9F);
                break;
        }
    }
}
