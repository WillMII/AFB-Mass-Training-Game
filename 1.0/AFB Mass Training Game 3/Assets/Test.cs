using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Test : MonoBehaviour
{
    public Material newMaterial; // Assign via Inspector
    public int materialIndex = 0;

    void ChangeMaterial()
    {
        Renderer renderer = GetComponent<Renderer>();

        if (renderer != null)
        {
            if (materialIndex < renderer.materials.Length)
            {
                Material[] materials = renderer.materials; // Get a copy of materials
                Debug.Log($"Changing material at index {materialIndex} from {materials[materialIndex].name} to {newMaterial.name}");

                materials[materialIndex] = newMaterial; // Update the specific material
                renderer.materials = materials; // Reassign the materials array
            }
            else
            {
                Debug.LogError($"Invalid material index: {materialIndex}. Max index is {renderer.materials.Length - 1}");
            }
        }
        else
        {
            Debug.LogError("Renderer component not found!");
        }
    }

    void Start()
    {
        if (newMaterial != null)
        {
            ChangeMaterial();
        }
        else
        {
            Debug.LogError("New material is not assigned!");
        }
    }
}
